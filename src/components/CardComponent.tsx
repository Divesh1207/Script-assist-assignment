import React from 'react';
import { Card, Text, Group, Badge, Button, Accordion, Divider } from '@mantine/core';
import { CardComponentProps } from '../models/models' // Adjust the path as necessary
import '../styles/styling/CardComponent.scss';

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  badgeLabel,
  details,
  onClick,
  accordionItems,
}) => (
  <Card className="card-component" shadow="sm" p="lg" radius="md" withBorder>
    <Group className="card-header" position="apart">
      <Text className="card-title" weight={600} size="lg">{title}</Text>
      <Badge className="card-badge" color="pink" variant="light">{badgeLabel}</Badge>
    </Group>

    <Text className="card-details" mt="md">{details}</Text>

    <Divider my="md" />

    <Accordion className="card-accordion" multiple>
      {accordionItems.map((item, index) => (
        <Accordion.Item key={index} value={String(index)}>
          <Accordion.Control className="accordion-control">
            <Text weight={500}>{item.label}</Text>
          </Accordion.Control>
          <Accordion.Panel className="accordion-panel">
            {item.content}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>

    <Button className="view-details-button" onClick={onClick} mt="md" fullWidth variant="light">
      View Details
    </Button>
  </Card>
);

export default CardComponent;
