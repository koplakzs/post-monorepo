<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ResponseHelper
{
    public static function jsonResponse($success, $message, $data, $statusCode, $isPaginated = false): JsonResponse
    {
        // 1. Buat base response
        $response = [
            'success' => $success,
            'message' => $message,
        ];

        // 2. Jika paginated, gabungkan isi $data langsung ke $response
        if ($isPaginated && (is_array($data) || is_object($data))) {
            // Kita ubah dulu ke array jika itu object (Resource)
            $dataArray = is_object($data) && method_exists($data, 'toArray')
                ? $data->toArray(request())
                : (array) $data;

            $response = array_merge($response, $dataArray);
        } else {
            // Jika bukan paginasi, masukkan ke dalam key 'data' seperti biasa
            $response['data'] = $data;
        }

        return response()->json($response, $statusCode);
    }
}
