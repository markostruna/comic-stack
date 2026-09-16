<?php

declare(strict_types=1);

namespace Comic\Api\Archive;

use RuntimeException;

final class ProcessRunner
{
    public function __construct(private readonly int $timeoutSeconds = 300)
    {
    }

    /** @return array{stdout: string, stderr: string, exitCode: int} */
    public function run(array $command, ?string $stdin = null): array
    {
        $pipes = [];
        $process = proc_open($command, [
            ['pipe', 'r'],
            ['pipe', 'w'],
            ['pipe', 'w'],
        ], $pipes, null, null, ['bypass_shell' => true]);
        if (!is_resource($process)) {
            throw new RuntimeException('Unable to start archive tool.');
        }

        fwrite($pipes[0], $stdin ?? '');
        fclose($pipes[0]);
        stream_set_blocking($pipes[1], false);
        stream_set_blocking($pipes[2], false);
        $stdout = '';
        $stderr = '';
        $startedAt = microtime(true);
        do {
            $stdout .= stream_get_contents($pipes[1]);
            $stderr .= stream_get_contents($pipes[2]);
            $status = proc_get_status($process);
            if ($status['running'] && microtime(true) - $startedAt > $this->timeoutSeconds) {
                proc_terminate($process);
                fclose($pipes[1]);
                fclose($pipes[2]);
                proc_close($process);
                throw new RuntimeException('Archive tool timed out.');
            }
            if ($status['running']) usleep(10_000);
        } while ($status['running']);

        $stdout .= stream_get_contents($pipes[1]);
        $stderr .= stream_get_contents($pipes[2]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        $exitCode = proc_close($process);
        if ($exitCode !== 0) {
            throw new RuntimeException(trim($stderr) ?: 'Archive tool failed.');
        }
        return ['stdout' => $stdout, 'stderr' => $stderr, 'exitCode' => $exitCode];
    }
}
