export default function EcosystemPagination({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}) {
    const getPageNumbers = () => {
        const delta = 3; // Number of pages to show on each side of current page
        const range = [];
        
        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift('...');
        }
        if (currentPage + delta < totalPages - 1) {
            range.push('...');
        }

        // Always add first and last page
        range.unshift(1);
        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    };

    return (
        <div className="pager">
            {currentPage > 1 && (
                <button className="pager__prev" onClick={() => onPageChange(currentPage - 1)}>
                    Prev
                </button>
            )}
            <ul className="nums">
                {getPageNumbers().map((pageNum, index) => (
                    <li
                        key={index}
                        onClick={() => typeof pageNum === 'number' ? onPageChange(pageNum) : null}
                        className={`${pageNum === currentPage ? 'active' : ''} ${typeof pageNum === 'string' ? 'ellipsis' : ''}`}
                    >
                        <span>{pageNum}</span>
                    </li>
                ))}
            </ul>
            {currentPage < totalPages && (
                <button className="pager__next" onClick={() => onPageChange(currentPage + 1)}>
                    Next
                </button>
            )}
        </div>
    )
}