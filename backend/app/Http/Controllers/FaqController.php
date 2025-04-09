<?php

namespace App\Http\Controllers;

use App\Models\Faq;

class FaqController
{
    public function createFaq(array $data)
    {
        $faq = new Faq($data);
        $faq->save();
        return $faq;
    }

    public function updateFaq(int $id, array $data)
    {
        $faq = Faq::find($id);
        if ($faq) {
            $faq->update($data);
            return $faq;
        }
        return null;
    }

    public function deleteFaq(int $id)
    {
        $faq = Faq::find($id);
        if ($faq) {
            $faq->delete();
            return true;
        }
        return false;
    }

    public function getFaq(int $id)
    {
        return Faq::find($id);
    }
}