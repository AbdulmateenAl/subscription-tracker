import sendRenewalEmail from "../utils/emailService.js";
import Subscription from '../model/subscription.model.js'

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        res.status(201).json({ success: true, data: subscription });
    } catch (err) {
        next(err);
    }
}

export const getAllSubscription = async (req, res, next) => {
    try {
        if (!req.user._id) {
        const error = new Error("you are not authorized");
        error.statusCode = 401;
        throw error;
        }

        const subscriptions = await Subscription.find({});
        res.status(201).json({
            success: true,
            data: subscriptions
        })
    } catch (err) {
        next(err);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (!req.user._id) {
            const error = new Error("You are not authorized");
            error.statusCode = 401;
            throw error;
        }
        
        const subscriptions = await Subscription.find({ user: req.user._id});
        res.status(200).json({
            message: "success",
            data: subscriptions
        })
    } catch (err) {
        next(err);
    }
}

export const getSubscriptionDetails = async (req, res, next) => {
    try {
        if (!req.user._id) {
        const error = new Error("You are not authorized");
        error.statusCode = 401;
        throw error;
    }

    const subscription = await Subscription.findById(req.params.id);
    res.status(201).json({
        success: true,
        data: subscription
    })
    } catch (err) {
        next(err);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        if (!req.user._id) {
        const error = new Error("You are not authorized");
        error.statusCode = 401;
        throw error;
    }

    const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
        success: true,
        data: subscription
    })
    } catch (err) {
        next(err);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        if (!req.user._id) {
        const error = new Error("You are not authorized");
        error.statusCode = 401;
        throw error;
    }

    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    res.status(201).json({
        success: true,
        data: subscription
    })
    } catch (err) {
        next(err);
    }
}

export const cancelSubscription = async (req, res, next) => {
    try {
        if (!req.user._id) {
        const error = new Error("You are not authorized");
        error.statusCode = 401;
        throw error;
    }

    const subscription = await Subscription.findByIdAndUpdate(req.params.id, { ...req.body, status: req.body.status });
    res.status(201).json({
        success: true,
        data: subscription
    })
    } catch (err) {
        next(err);
    }
}

export const getAUpcomingRenewals = async (req, res, next) => {
    try {
        if (!req.user._id) {
        const error = new Error("You are not authorized");
        error.statusCode = 401;
        throw error;
    }

    const subscription = await Subscription.find(req.params.id);
    res.status(201).json({
        success: true,
        data: subscription
    })
    } catch (err) {
        next(err);
    }
}

export const checkRenewalsAndSendEmails = async () => {
    const daysBeforeRenewal = [7, 5, 3, 1];
    const today = new Date();

    for (let days of daysBeforeRenewal) {
        const targetDate = new Date();
        targetDate.setDate(today.getDate() + days);

        const subscriptions = await Subscription.find({ renewalDate: targetDate }).populate('user');

        subscriptions.forEach(async (sub) => {
            await sendRenewalEmail(sub.user.email, sub.user.name, sub.name, sub.renewalDate, days, sub.status);
        });
    }
};