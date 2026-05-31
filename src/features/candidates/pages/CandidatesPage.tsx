import { useCandidates } from '../hooks/useCandidates';
import { CandidateTable } from '../components/CandidateTable';
import { CandidateFilters } from '../components/CandidateFilters';
import { Button } from '@/components/ui/button';

export function CandidatesPage() {
  const { 
    data: candidates, 
    isLoading, 
    filters, 
    setFilters,
    currentPage,
    totalPages,
    setPage,
    totalCount,
    perPage
  } = useCandidates();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight !text-black" style={{ fontWeight: 'bold' }}>Candidates</h1>
          <p className="text-[#717786] text-sm mt-1">
            Manage and track your active talent pipeline.
          </p>
        </div>
          <CandidateFilters filters={filters} setFilters={setFilters} />
      </div>

      <CandidateTable candidates={candidates} isLoading={isLoading} />
      
      {!isLoading && candidates.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="text-sm font-semibold text-[#0058bc]">
            Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, totalCount)} of {totalCount} candidates
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="px-3 py-1.5"
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="px-3 py-1.5"
              disabled={currentPage >= totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
