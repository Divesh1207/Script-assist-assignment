import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Title, Text, Grid, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../services/resourceService';
import { Starship } from '../../models/models';
import CardComponent from '../../components/CardComponent';
 

const fetchStarships = async (): Promise<Starship[]> => {
  const data = await fetchData('https://swapi.dev/api/starships/');
  return data.results;
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data: starships, isLoading, error } = useQuery<Starship[]>(['starships'], fetchStarships);

  const filteredStarships = starships?.filter((ship) =>
    ship.name.toLowerCase().includes(search.toLowerCase()) ||
    ship.model.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>An error occurred</Text>;

  return (
    <Container size="xl" py="xl">
      <Title order={1} align="center" mb="xl">Welcome to the Star Wars Starship Emporium</Title>
      <Text align="center" size="lg" mb="xl" color="dimmed">Explore our vast collection of starships from across the galaxy</Text>

      <TextInput placeholder="Search starships" mb="lg" value={search} onChange={(e) => setSearch(e.target.value)} />

      <Grid>
        {filteredStarships?.map((ship) => (
          <Grid.Col key={ship.name} xs={12} sm={6} md={4}>
            <CardComponent
              title={ship.name}
              badgeLabel={ship.starship_class}
              details={
                <>
                  <Text size="sm" color="dimmed">Model: {ship.model}</Text>
                  <Text size="sm" color="dimmed">Manufacturer: {ship.manufacturer}</Text>
                  <Text size="sm" color="dimmed">Cost: {ship.cost_in_credits} credits</Text>
                  <Text size="sm" color="dimmed">Passengers: {ship.passengers}</Text>
                  <Text size="sm" color="dimmed">Cargo Capacity: {ship.cargo_capacity} kg</Text>
                </>
              }
              onClick={() => navigate(`/character/${ship.name}`)}
              accordionItems={[]} // Supply appropriate data if required
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}