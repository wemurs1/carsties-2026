import Listings from "@/features/listings/Listings";
import {AppPagination} from "@/components/ui/app-pagination";
import {getListings} from "@/features/listings/actions";

export default async function Home(props: PageProps<"/">) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams["pageNumber"] || 1);
    const pageSize = Number(searchParams["pageSize"] || 8);
    const data = await getListings(page, pageSize);

    return (
        <div>
            <Listings auctions={data.results}/>
            <AppPagination page={page} pageSize={pageSize} totalCount={data.totalCount}/>
        </div>
    );
}
