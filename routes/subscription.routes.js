import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { cancelSubscription, createSubscription, deleteSubscription, getAllSubscription, getAUpcomingRenewals, getSubscriptionDetails, getUserSubscriptions, updateSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.get('/', authorize, getAllSubscription);

subscriptionRouter.get('/user', authorize, getUserSubscriptions);

subscriptionRouter.get('/:id', authorize, getSubscriptionDetails);

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

subscriptionRouter.put('/upcoming-renewals', authorize, getAUpcomingRenewals);

export default subscriptionRouter;