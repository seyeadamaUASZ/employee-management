import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
    providedIn: 'root'
})
export class CustomPagination extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Enregistrement par page';
    override nextPageLabel = 'Page suivante';
    override previousPageLabel = 'Page précédente';
    override firstPageLabel = 'La première page';
    override lastPageLabel = 'Dernière page';

    override getRangeLabel = (page: number, pageSize: number, length: number): string => {
        if (length === 0 || pageSize === 0) {
            return `0 de ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} Sur ${length}`;
    };
}
