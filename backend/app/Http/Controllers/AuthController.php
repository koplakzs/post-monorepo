<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\AuthRequestRegister;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(AuthRequestRegister $request)
    {
        // Pastikan AuthRequest Anda sudah mendukung validasi 'name'
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            DB::commit();

            $data = [
                'user' => $user,
                'token' => $token
            ];

            return ResponseHelper::jsonResponse(true, 'User berhasil registrasi', $data, 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return ResponseHelper::jsonResponse(false, 'Gagal melakukan registrasi: ' . $th->getMessage(), null, 500);
        }
    }

    public function auth(AuthRequest $request)
    {
        $validated = $request->validated();
        $query = User::query();
        $user = $query->where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return ResponseHelper::jsonResponse(false, 'Email atau password salah.', null, 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $data = [
            'user' => $user,
            'token' => $token
        ];

        return ResponseHelper::jsonResponse(true, 'User berhasil login', $data, 200);
    }

    public function logout(Request $request)
    {
        // $request->user()->currentAccessToken()->delete();
        $token = $request->user()->currentAccessToken();

        /** @var \Laravel\Sanctum\PersonalAccessToken $token */
        if ($token) {
            $token->delete();
        }
        return ResponseHelper::jsonResponse(true, 'User berhasil logout', null, 200);
    }
}
