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

export default function Paginado({ countryPage, allCountries, paginado }) {
  const pageCount = Math.ceil(allCountries / countryPage);

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
