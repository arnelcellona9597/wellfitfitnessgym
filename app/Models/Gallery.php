<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Gallery extends Model
{
    use HasFactory;

    protected $table = 'gallery';
    
    protected $fillable = [
        'id', 
        'gallery_image'
    ];  

 
    public static function getAllGalleryImages()
    {
        return self::all();
    }

    public static function getGalleryImageByID($id)
    {
        return self::find($id);
    }    


}
