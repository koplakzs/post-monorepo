<?php

namespace App\Repositories;

use App\Interfaces\PostRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Override;

class PostRepository implements PostRepositoryInterface
{
    #[Override]
    public function getAll(?string $search, ?int $limit, bool $execute)
    {
        $query = Auth::user()->posts();

        if ($search) {
            $query->search($search);
        }

        $query->latest();

        if ($limit) {
            $query->limit($limit);
        }

        return $execute ? $query->get() : $query;
    }
    #[Override]
    public function getAllPaginated(?string $search, ?int $rowPerPage)
    {
        $query = $this->getAll($search, $rowPerPage, false);

        return $query->paginate($rowPerPage);
    }

    #[Override]
    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $post = Auth::user()->posts()->create([
                'title' => $data['title'],
                'post'  => $data['post'],
            ]);

            DB::commit();
            return $post;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception($th->getMessage());
        }
    }

    #[Override]
    public function update(string $id, array $data)
    {
        DB::beginTransaction();
        try {
            $post = Auth::user()->posts()->findOrFail($id);

            $post->update([
                'title' => $data['title'],
                'post'  => $data['post'],
            ]);

            DB::commit();
            return $post;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception("Unauthorized or Post not found.");
        }
    }

    #[Override]
    public function getById(string $id)
    {
        return Auth::user()->posts()->where('id', $id)->first();
    }

    #[Override]
    public function delete(string $id)
    {
        DB::beginTransaction();
        try {
            $post = Auth::user()->posts()->findOrFail($id);
            $post->delete();

            DB::commit();
            return true;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception("Unauthorized or Post not found.");
        }
    }
}
