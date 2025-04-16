<?PHP 
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FaqController extends Controller
{
    /**
     * Get all FAQs.
     */
    public function index()
    {
        $faqs = DB::table('faqs')->get();
        return response()->json($faqs, 200);
    }

    /**
     * Get a single FAQ by ID.
     */
    public function show($id)
    {
        $faq = DB::table('faqs')->where('Id_FAQ', $id)->first();

        if (!$faq) {
            return response()->json(['message' => 'FAQ not found'], 404);
        }

        return response()->json($faq, 200);
    }

    /**
     * Create a new FAQ.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Question' => 'required|string|max:255',
            'Reponde' => 'required|string|max:255',
            'categorie' => 'required|string|max:50',
        ]);

        $id = DB::table('faqs')->insertGetId([
            'Question' => $request->input('Question'),
            'Reponde' => $request->input('Reponde'),
            'categorie' => $request->input('categorie'),
            'Nombre_vues' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'FAQ created successfully', 'Id_FAQ' => $id], 201);
    }

    /**
     * Update an existing FAQ.
     */
    public function update(Request $request, $id)
    {
        $faq = DB::table('faqs')->where('Id_FAQ', $id)->first();

        if (!$faq) {
            return response()->json(['message' => 'FAQ not found'], 404);
        }

        $request->validate([
            'Question' => 'sometimes|string|max:255',
            'Reponde' => 'sometimes|string|max:255',
            'categorie' => 'sometimes|string|max:50',
        ]);

        DB::table('faqs')->where('Id_FAQ', $id)->update([
            'Question' => $request->input('Question', $faq->Question),
            'Reponde' => $request->input('Reponde', $faq->Reponde),
            'categorie' => $request->input('categorie', $faq->categorie),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'FAQ updated successfully'], 200);
    }

    /**
     * Delete an FAQ.
     */
    public function destroy($id)
    {
        $faq = DB::table('faqs')->where('Id_FAQ', $id)->first();

        if (!$faq) {
            return response()->json(['message' => 'FAQ not found'], 404);
        }

        DB::table('faqs')->where('Id_FAQ', $id)->delete();

        return response()->json(['message' => 'FAQ deleted successfully'], 200);
    }
}