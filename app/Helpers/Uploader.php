<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class Uploader
{
    public static function uploadFile(string $key, string $path): string
    {
        $fileName = self::generateFileName($key);
        request()->file($key)->storeAs("public/{$path}", $fileName);
        return $fileName;
    }



    protected static function generateFileName(string $key): string
    {
        $extension = request()->file($key)->getClientOriginalExtension();
        return sprintf('%s.%s', now()->timestamp, $extension);
        // id-2021-02-20.pdf
    }

    public static function removeFile(string $path, string $fileName)
    {
        Storage::delete(sprintf('public/%s/%s', $path, $fileName));
    }

    public static function removeFolder(string $path)
    {
        Storage::deleteDirectory(sprintf('public/%s', $path));
    }
}
