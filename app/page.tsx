import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import { useEffect, useState } from "react";
import EmptyState from "./components/EmptyState";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container/Container";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams
}

const Home = ({ searchParams }: HomeProps) => {
  const [listings, setListings] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserData = await getCurrentUser();
        setCurrentUser(currentUserData);

        const listingsData = await getListings(searchParams);
        setListings(listingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Container>
          <EmptyState showReset />
        </Container>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 mt-16">
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
            {listings.map((listing: any) => (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))}
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Home;
