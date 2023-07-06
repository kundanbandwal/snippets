import { useEffect, useState } from "react";

interface Pagination<T> {
  data: T[];
  initialItemsPerPage: number;
}

interface PaginationReturn<T> {
    next: () => void;
    prev: () => void;
    jump: (page: number) => void;
    currentData: () => T[];
    currentPage: number;
    maxPage: number;
    itemsPerPage: number;
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const usePagination = <T,>({ data, initialItemsPerPage }: Pagination<T>):PaginationReturn<T> => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);
    const [maxPage, setMaxPage] = useState<number>(Math.ceil(data.length / itemsPerPage));

    useEffect(() => {
        setMaxPage(Math.ceil(data.length / itemsPerPage));
    }, [data, itemsPerPage]);

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function next() {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }

    function jump(page: number) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(() => Math.min(pageNumber, maxPage));
    }

    return { next, prev, jump, currentData, currentPage, maxPage, itemsPerPage, setItemsPerPage };
};

export default usePagination;



import {
    Box,
    FormControl,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography
} from "@mui/material";
import { 
    ChangeEvent, 
    useEffect, 
    useState 
} from "react";
import 
useFetchClientDetails, 
{ ClientDetails } from "../../../../../hooks/api/useFetchClientDetails";

import CompanyCard from "../../../components/CompanyCard";
import SearchInputField from "../../../BankMaster/components/searchInputField";
import {
    StyledPagination
} from "../../../ClientMaster/Checker/PendingCheckerEntryItems/PaginationStyles";
import classMasterDetailsFormDispatchActionsProvider from "../../../../../redux/AifMaster/ClassMaster/Maker/dispatchActionsProvider";
import classMasterPageContextDispatchActionProvider from "../../../../../redux/AifMaster/ClassMaster/ClassMasterPageContext/dispatchActionsProvider";
import usePagination from "../../../../../hooks/util/usePagination";

const MakerClassCardPage = () => {
    const [filteredCompanyList, setFilteredCompanyList] = useState<ClientDetails[]>([]);
    const [clientDetails, setClientDetails] = useState<ClientDetails[]>([]);
    const { currentData, currentPage, maxPage, jump, itemsPerPage, setItemsPerPage } = usePagination<ClientDetails>({
        "data": filteredCompanyList,
        "initialItemsPerPage": 5,
    });

    const [searchTerm, setSearchTerm] = useState<string>('');

    // const [page, setPage] = useState(1);
    // const [pageCount, setPageCount] = useState(1);
    // const [itemCountPerPage,setItemCountPerPage] = useState(5);
    // const indexOfLastData = page * itemCountPerPage;
    // const indexOfFirstData = indexOfLastData - itemCountPerPage;

    const fetchClientDetails = useFetchClientDetails();

    useEffect(() => {
        fetchClientDetails("class_master", "0")
            .then((result) => {
                setClientDetails(result);
                setFilteredCompanyList(result);

                //setPageCount(Math.ceil( result/ itemCountPerPage));
            });
    },[]);

    const handleChange = (
        event: React.ChangeEvent<unknown>,
        pageCurrent: number
    ) => {
        jump(pageCurrent);
        // setPage(pageCurrent);
    };
    
    const {
        setMakerNavigation,
    } = classMasterPageContextDispatchActionProvider();

    const {
        setClientCode,
        setCompanyName,
    } = classMasterDetailsFormDispatchActionsProvider();

    const handleCompanyCardSearch = ( ele: ChangeEvent<Element> ) => {
        const searchValue = (ele.target as HTMLInputElement).value;
        setSearchTerm(searchValue);

        // const filterCompanyList = clientDetails.filter((client) => 
        //     client.clientName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        // );
        
        // setFilteredCompanyList(filterCompanyList);
        
    };

    const filteredData = searchTerm.length && currentData().length 
        ? currentData().filter((item) =>
            item.clientName.toLowerCase().includes(searchTerm.toLowerCase())
        ) : currentData();

    return (
        <>
            <Grid container spacing={2}>
                <SearchInputField
                    handleBankSearch={handleCompanyCardSearch} 
                    placeholder="Search by Client Name"
                />
                <Grid container spacing={2}>
                    {filteredData.map((card) => (
                        <Grid item xs={3}>
                            <CompanyCard
                                companyCode={card.clientCode}
                                companyName={card.clientName}
                                companyLogo=""
                                onClick={() => {
                                    setMakerNavigation("list");
                                    setClientCode(card.clientCode);
                                    setCompanyName(card.clientName);
                                }}
                            />
                        </Grid>
                    ))}
                    {filteredCompanyList.length === 0 &&
                    <Grid
                        sx={{
                            "padding": "20px 50px",
                            "width": "100%",
                        }}>
                        <Typography variant="navigationSectionNormal">
                            No Results Found
                        </Typography>
                    </Grid>
                    }
                </Grid>
            </Grid>

            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={5}> 
                <FormControl sx={{ "minWidth": "50px"}}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Select
                            value={itemsPerPage.toString()}
                            style={{ "height": "30px" }}                        
                            onChange={(event: SelectChangeEvent) => {
                                setItemsPerPage(parseInt(event.target.value));
                                // setPage(1);
                            }}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                        </Select>
                        
                        <Typography variant="paginationRow">Rows per page</Typography>                    
                    </Stack>
                </FormControl>

                <Box></Box>
                
                <StyledPagination 
                    count={maxPage} 
                    variant="outlined" 
                    shape="rounded" 
                    page={currentPage} 
                    onChange={handleChange}
                />
            </Stack>
        </>
    );

};

export default MakerClassCardPage;

