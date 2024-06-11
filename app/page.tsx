import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async({searchParams}: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  const formattedCurrentUser = currentUser ? {
    ...currentUser,
    createdAT: currentUser.createdAT.toISOString(),
    updatedAT: currentUser.updatedAT,
    emailVerified: currentUser.emailVerified ? currentUser.emailVerified : null
} : null;

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 mt-16"> {/* Adjust the top margin to ensure space below the Categories */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
            "
          >
            {listings.map((listing: any) => {
              return(
                <ListingCard
                  currentUser={formattedCurrentUser}
                  key={listing.id}
                  data={listing}
                  />
              )
            })}
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
}
 export default Home;