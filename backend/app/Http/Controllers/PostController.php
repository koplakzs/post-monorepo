<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PaginatedResource;
use App\Http\Resources\PostResource;
use App\Interfaces\PostRepositoryInterface;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private PostRepositoryInterface $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request = $request->validate([
            'search' => 'nullable|string',
            'row_per_page' => 'required|integer'
        ]);
        try {
            $post = $this->postRepository->getAllPaginated($request['search'] ?? null, $request['row_per_page']);

            return ResponseHelper::jsonResponse(true, 'Post Berhasil Diambil', PaginatedResource::make($post,  PostResource::class), 200, true);
        } catch (\Throwable $th) {
            return ResponseHelper::jsonResponse(false, $th->getMessage(), null, 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $request = $request->validated();

        try {
            $post = $this->postRepository->create($request);
            return ResponseHelper::jsonResponse(true, 'Post berhasil ditambahkan', new PostResource($post), 201);
        } catch (\Throwable $th) {
            return ResponseHelper::jsonResponse(false, $th->getMessage(), null, 500);
        }
    }

    public function show(string $id)
    {
        try {
            $post = $this->postRepository->getById($id);
            if (!$post) {
                return ResponseHelper::jsonResponse(false, 'Post tidak ditemukan', null, 404);
            }
            return ResponseHelper::jsonResponse(true, 'Post ditemukan', new PostResource($post), 200);
        } catch (\Throwable $th) {
            return ResponseHelper::jsonResponse(false, $th->getMessage(), null, 500);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, string $id)
    {
        $request = $request->validated();
        try {
            $post = $this->postRepository->getById($id);
            if (!$post) {
                return ResponseHelper::jsonResponse(false, 'Post tidak ditemukan', null, 404);
            }

            $post = $this->postRepository->update($id, $request);

            return ResponseHelper::jsonResponse(true, 'Post berhasil di update', new PostResource($post), 200);
        } catch (\Throwable $th) {
            return ResponseHelper::jsonResponse(false, $th->getMessage(), null, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $post = $this->postRepository->getById($id);
            if (!$post) {
                return ResponseHelper::jsonResponse(false, 'Post tidak ditemukan', null, 404);
            }

            $this->postRepository->delete($id);

            return ResponseHelper::jsonResponse(true, 'Post berhasil di hapus', null, 200);
        } catch (\Throwable $th) {
            return ResponseHelper::jsonResponse(false, $th->getMessage(), null, 500);
        }
    }
}
