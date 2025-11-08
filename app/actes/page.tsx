// app/actes/page.tsx

import { getActes } from "@/lib/client/endpoints/actes";


export default async function ActesPage() {
  const { readActesApiActesGet } = getActes(); // destructure from the returned object
  const response = await readActesApiActesGet();
  const actes = response.data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Actes Administratifs</h1>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Numéro</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Objet</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Statut</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {actes?.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.numero}</td>
                <td className="p-3">{item.objet}</td>
                <td className="p-3">{item.type_acte}</td>
                <td className="p-3">{item.statut}</td>
                <td className="p-3">
                  <a
                    href={`/actes/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Voir
                  </a>
                </td>
              </tr>
            ))}

            {(!actes || actes.length === 0) && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Aucun acte trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <a
          href="/actes/nouveau"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Créer un acte
        </a>
      </div>
    </div>
  );
}
