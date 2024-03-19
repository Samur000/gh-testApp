import React from 'react';
import { Card, Image } from 'react-bootstrap';

interface RepositoryCardProps {
    repository: {
        id: number;
        name: string;
        owner: {
            login: string;
            avatar_url: string;
            html_url?: string;
        };
        stargazers_count: number;
        watchers_count: number;
        html_url: string;
        description: string;
    };
}
const RepositoryCard: React.FC<RepositoryCardProps> = ({repository}) => {
    return (
        <Card key={repository.id} style={{width: '18rem', marginBottom: '20px'}}>
            <Card.Body>
                <Card.Title><a href={repository.html_url}>{repository.name}</a> </Card.Title>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <Image roundedCircle src={repository.owner.avatar_url} width="50px"></Image>
                    <Card.Subtitle className="mb-2 text-muted"><a href={repository.owner.html_url}>{repository.owner.login}</a></Card.Subtitle>
                </div>
                <Card.Text>
                    <strong>Звезды:</strong> {repository.stargazers_count}<br />
                    <strong>Просмотры:</strong> {repository.watchers_count}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RepositoryCard;
