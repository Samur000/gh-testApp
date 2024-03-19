import React, { useEffect, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import RepositoryCard from './components/RepositoryCard';

interface Repository {
    id: number;
    name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    stargazers_count: number;
    watchers_count: number;
    html_url: string;
    description: string;
}

function App() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [repoName, setRepoName] = useState<string>(() => localStorage.getItem('repoName') || '');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setRepoName(event.target.value);

    const searchRepositories = (searchTerm: string) => {
        if (searchTerm.trim() !== '') {
            setLoading(true);
            fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data.items) {
                    setRepositories(data.items);
                    localStorage.setItem('repoName', searchTerm);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
                setLoading(false);
            });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchRepositories(repoName);
    };

    useEffect(() => {
        const storedRepoName = localStorage.getItem('repoName') || '';
        searchRepositories(storedRepoName);
    }, []);

    return (
        <div className="App">
      <Container>
        <h1>Поиск репозиториев на GitHub</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Название репозитория:</Form.Label>
            <Form.Control type="text" value={repoName} onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Поиск
          </Button>
        </Form>
        <br />
          {loading ? (
              <p>Loading...</p>
          ) : (
              <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {repositories.map(repository => (
                <RepositoryCard key={repository.id} repository={repository} />
            ))}
          </div>
          )}
      </Container>
    </div>
    );
}

export default App;
