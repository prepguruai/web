import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { SendChatMessage } from '../services/ChatService';
import { Container, IconButton } from '@mui/material';
import Markdown from 'react-markdown'
import CloseIcon from '@mui/icons-material/Close';

const ArticlePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const hasFetched = useRef(false);
    const query = new URLSearchParams(location.search).get('q');
  
    useEffect(() => {
      const fetchArticle = async () => {
        if (query && !hasFetched.current) {
          hasFetched.current = true;

          try {
            const response = await SendChatMessage(query);
            const article = {
                title: query,
                content: response
            };

            setArticle(article);
          } catch (err) {
            setError('Failed to fetch the article.');
          } finally {
            setLoading(false);
          }
        }
      };
  
      fetchArticle();
    }, [query]);
  
    return (
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, pl: 2 }}>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Thread
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        ) : article ? (
          <Box sx={{ overflowY: 'auto', p: 2, typography: 'body1', lineHeight: 1.6, letterSpacing: '0.00938em', textAlign: 'justify' }}>
            <Markdown>
              {`# ${article.title}\n\n${article.content}`}
            </Markdown>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Typography variant="h6" color="textSecondary">
              No article found.
            </Typography>
          </Box>
        )}
      </Container>
    );
};

interface Article {
    title: string;
    content: string;
}
  
export default ArticlePage;