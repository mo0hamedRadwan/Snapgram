import { Models } from "appwrite"
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultProps = {
  isSearchFetching: boolean,
  searchedPosts?: Models.Document[];
}

const SearchResults = ({ isSearchFetching = true, searchedPosts }: SearchResultProps) => {

  //console.log(searchedPosts);
  if(isSearchFetching) 
    return <Loader />;

  if(searchedPosts && searchedPosts.length > 0) 
    return <GridPostList posts={searchedPosts} />

  return (
    <p className="text-light-4 mt-10">
      No results found
    </p>
  )
}

export default SearchResults
