import express from 'express';
import { getTrendingMovies,getMovieTrailer,getMovieDetails,getSimilarMovies,getMoviesByCategory } from '../controller/movie.controller.js';

const router = express.Router();

router.get('/trending',getTrendingMovies);
router.get('/:id/trailer',getMovieTrailer);
router.get('/:id/details',getMovieDetails);
router.get('/:id/similar',getSimilarMovies);
router.get('/:category',getMoviesByCategory);   

export default router;