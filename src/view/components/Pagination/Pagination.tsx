import React, { ReactNode } from 'react'
import Button from '../Button/Button';
import '../../../assets/style/Pagination.css'

interface IPagination {
    pageCount: number;
    pageCurrent: number;
    pageSpace: number;
    handleClick: (page:number) => void;
}

interface IPageItem {
    page?: number;
    children: ReactNode;
    selected: boolean;
    handleClick: (page:number) => void;
}
const PageItem = ({page,children,selected,handleClick}:IPageItem) => {
    return (
        <div className={`page-item ${selected ? 'selected' : ''}`}>
            {(page || page === 0) && (
                <Button
                    onClick={() => handleClick(page)}
                >
                    {children}
                </Button>
            ) || (
                <Button>{children}</Button>
            )}
        </div>
    )   
}

const Pagination = ({pageCount,pageCurrent,pageSpace,handleClick}:IPagination) => {
    let pageFrontHalfContent
    let pageBeHindHalfContent 
    const pageSelectedContent = (
        <PageItem
            key={`page-item-${pageCurrent}`}
            handleClick={handleClick}
            selected
        >
            {pageCurrent + 1}
        </PageItem>
    )
    // Next page 
    const nextPage = (
        <PageItem
            page={pageCurrent + 1}
            handleClick={handleClick}
            selected={!1} //covert !1 => true
        >
            &gt;
        </PageItem>
    )
    // Previous page
    const prevPage = (
        <PageItem
            page={pageCurrent - 1}
            handleClick={handleClick}
            selected={!1} //covert !1 => true
        >
            &lt;
        </PageItem>
    )
    // Calculate pageFrontHalfContent
    if(pageCurrent > pageSpace + 1) {
        // delacre page's position will display behind '...'
        const pageFirstVisible = pageCurrent - pageSpace;
        pageFrontHalfContent = (
            <>
                <PageItem
                    key={`page-item-${1}`}
                    page={0}
                    handleClick={handleClick}
                    selected={!1} //covert !1 => true
                >
                    1
                </PageItem>
                <span>...</span>
                {
                    Array(pageSpace)
                    .fill(0)
                    .map((_p,i) => (
                        <PageItem
                            key={`page-item-${pageFirstVisible + i }`}
                            page={pageFirstVisible + i}
                            handleClick={handleClick}
                            selected={!1} //covert !1 => true
                        >
                            {pageFirstVisible + i + 1}
                        </PageItem>
                    ))
                }
            </>
        )
    }else {
        pageFrontHalfContent = Array(pageCurrent)
            .fill(0)
            .map((_p,i) => (
                <PageItem
                    key={`page-item-${i}`}
                    page={i}
                    handleClick={handleClick}
                    selected={!1}
                >
                    {i+1}
                </PageItem>
            ))
    }

    // Calculate pageBehindHalfContent
    if(pageCurrent < pageCount - 1 - pageSpace - 1) {
        pageBeHindHalfContent = (
            <>
                {
                    Array(pageSpace)
                    .fill(0)
                    .map((_p,i) => (
                        <PageItem
                            key={`page-item-${i+pageCurrent+1}`}
                            page={i + pageCurrent + 1}
                            handleClick={handleClick}
                            selected={!1}
                        >
                            {i + pageCurrent + 2}
                        </PageItem>
                    ))
                }
                <span>...</span>
                <PageItem
                    key={`page-item-${pageCount - 1}`}
                    page={pageCount - 1}
                    handleClick={handleClick}
                    selected={!1}
                >
                    {pageCount}
                </PageItem>
            </>
        )
    } else {
        pageBeHindHalfContent = Array((pageCount - 1 - pageCurrent) < 0 ? 0 : pageCount - 1 - pageCurrent)
            .fill(0)
            .map((_p,i) => (
                <PageItem
                    key={`page-item-${i + pageCurrent + 1}`}
                    page={i + pageCurrent + 1}
                    handleClick={handleClick}
                    selected={!1}
                >   
                    {i + pageCurrent + 2}
                </PageItem>
            ))
    } 

    // Calculate pageContent
    const pageContent = (
        <>
            {pageFrontHalfContent}
            {pageSelectedContent}
            {pageBeHindHalfContent}
        </>
    )
    switch (pageCurrent) {
        case 0:
            return (
                <div className="page-group">
                    {pageContent}
                    {nextPage}
                </div>
            )
        case pageCount - 1:
            return (
                <div className="page-group">
                    {prevPage}
                    {pageContent}
                </div>
            )
        default:
            return (
                <div className="page-group">
                    {prevPage}
                    {pageContent}
                    {nextPage}
                </div>
            )
    }
    
}

export default Pagination