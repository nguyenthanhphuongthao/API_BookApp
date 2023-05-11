import user from './user.router';
import auth from './auth.router';
import login from './login.router';
import book from './book.router';
import category from './category.router';
import publisher from './publisher.router';
import post from './post.router';
import like from './like.router';
import history from './history.router';
import comment from './comment.router';
import share from './share.router';
import review from './review.router';
import insert from './insert.router';
import { notFound } from '../middlewares/handle_errors';

const initRoutes = (app) => {

    app.use('/api/auth', auth);
    app.use('/api/account', login);
    app.use('/api/user', user);
    app.use('/api/book', book);
    app.use('/api/category', category);
    app.use('/api/publisher', publisher);
    app.use('/api/post', post);
    app.use('/api/history', history);
    app.use('/api/like', like);
    app.use('/api/comment', comment);
    app.use('/api/share', share);
    app.use('/api/review', review);
    app.use('/api/insert', insert);

    app.use(notFound);
};

module.exports = initRoutes;