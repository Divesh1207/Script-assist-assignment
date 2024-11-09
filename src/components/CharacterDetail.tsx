

import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, Text, Group, Badge, Button, Grid } from '@mantine/core';
import { fetchData } from '../services/resourceService';
import '../styles/styling/CharacterDetail.scss'

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';

  const { data: character, isLoading: characterLoading } = useQuery(['character', id], () =>
    fetchData(`https://swapi.dev/api/people/${id}/`)
  );

  const { data: homeworld, isLoading: homeworldLoading } = useQuery(
    ['homeworld', character?.homeworld],
    () => fetchData(character!.homeworld),
    { enabled: !!character }
  );

  const { data: films, isLoading: filmsLoading } = useQuery(
    ['films', character?.films],
    () => Promise.all(character!.films.map((url: string) => fetchData(url))),
    { enabled: !!character }
  );

  const { data: starships, isLoading: starshipsLoading } = useQuery(
    ['starships', character?.starships],
    () => Promise.all(character!.starships.map((url: string) => fetchData(url))),
    { enabled: !!character }
  );

  const { data: vehicles, isLoading: vehiclesLoading } = useQuery(
    ['vehicles', character?.vehicles],
    () => Promise.all(character!.vehicles.map((url: string) => fetchData(url))),
    { enabled: !!character }
  );

  if (characterLoading || homeworldLoading || filmsLoading || starshipsLoading || vehiclesLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <div className="character-detail">
      <div className="cards-container">
        <Card className="character-card">
          <Text className="character-name">{character?.name}</Text>
          <Badge className="character-gender">{character?.gender}</Badge>
          <div className="character-info">
            <div className="info-item">
              <Text className="info-label">Height</Text>
              <Text className="info-value">{character?.height} cm</Text>
            </div>
            <div className="info-item">
              <Text className="info-label">Mass</Text>
              <Text className="info-value">{character?.mass} kg</Text>
            </div>
            <div className="info-item">
              <Text className="info-label">Hair Color</Text>
              <Text className="info-value">{character?.hair_color}</Text>
            </div>
            <div className="info-item">
              <Text className="info-label">Skin Color</Text>
              <Text className="info-value">{character?.skin_color}</Text>
            </div>
            <div className="info-item">
              <Text className="info-label">Eye Color</Text>
              <Text className="info-value">{character?.eye_color}</Text>
            </div>
            <div className="info-item">
              <Text className="info-label">Birth Year</Text>
              <Text className="info-value">{character?.birth_year}</Text>
            </div>
          </div>
        </Card>

        <Card className="homeworld-card">
          <Text className="homeworld-title">Homeworld</Text>
          <div className="homeworld-info">
            <div className="info-item">
              <Text className="info-label">Name</Text>
              <Text className="info-value">{homeworld?.name}</Text>
            </div>
            <div className="info-item">
              <Text className="info-label">Climate</Text>
              <Text className="info-value">{homeworld?.climate}</Text>
            </div>
            <div className="info-item">
              <Text className="info-label">Terrain</Text>
              <Text className="info-value">{homeworld?.terrain}</Text>
            </div>
            <div className="info-item">
              <Text className="info-label">Population</Text>
              <Text className="info-value">{homeworld?.population}</Text>
            </div>
          </div>
        </Card>

        <Card className="character-card">
          <Text className="homeworld-title">Films</Text>
          <div className="character-info">
            {films?.map((film: any) => (
              <div key={film.title} className="info-item">
                <Text className="info-value">{film.title}</Text>
              </div>
            ))}
          </div>
        </Card>

        <Card className="character-card">
          <Text className="homeworld-title">Starships</Text>
          <div className="character-info">
            {starships?.map((starship: any) => (
              <div key={starship.name} className="info-item">
                <Text className="info-value">{starship.name}</Text>
              </div>
            ))}
          </div>
        </Card>

        <Card className="character-card">
          <Text className="homeworld-title">Vehicles</Text>
          <div className="character-info">
            {vehicles?.map((vehicle: any) => (
              <div key={vehicle.name} className="info-item">
                <Text className="info-value">{vehicle.name}</Text>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Group position="center" mt="xl">
        <Link to={`/characters?page=${page}`}>
          <Button className="view-more-button">Back to Characters</Button>
        </Link>
      </Group>
    </div>
  );
}