import React from 'react';
import { Pagination, styled } from '@mui/material';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '& .MuiPaginationItem-textPrimary': {
    color: 'white',
  },
}));

export default function Paginado({ countryPage, allCountries, paginado, currentPage }) {
  const pageCount = Math.ceil(allCountries / (currentPage === 1 ? 9 : 10));

  const handlePageChange = (event, page) => {
    paginado(page);
  };

  return (
    <nav>
      <StyledPagination
        count={pageCount}
        shape="rounded"
        onChange={handlePageChange}
      />
    </nav>
  );
}
