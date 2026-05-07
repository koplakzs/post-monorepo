<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'post', 'user_id'])]
class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return $query->where('name', 'like', '%' . $search . '%');
    }
}
