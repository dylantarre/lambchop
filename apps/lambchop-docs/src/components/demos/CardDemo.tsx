import { Card } from "lmbchp";

export default function CardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <Card.Header>
          <Card.Title>Monthly Revenue</Card.Title>
          <Card.Description>January 2026 performance</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-3xl font-semibold text-foreground">$24,680</p>
        </Card.Content>
        <Card.Footer>
          <p className="text-xs text-muted-foreground">Updated 2 hours ago</p>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>Active Writers</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-3xl font-semibold text-foreground">24</p>
        </Card.Content>
      </Card>
    </div>
  );
}
