import { mongoose } from 'mongoose';

const subscriptionModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, "Subscription Price is required"],
        min: 0
    },
    currency: {
        type: String,
        enum: ["USD", "NGN", "GBR"],
        default: "NGN"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["sport", "entertainment", "news", "lifestyle", "technology", "finance", "politics", "others"],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start Date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal Date must be after start Date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true })

// Auto calculate renewal date if missing
subscriptionModel.pre('save', function (next) {
    const renewalPeriod = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365
    };
    if (!this.renewalDate) {

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

    // Auto-update status if renawal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    
    next();
})

const Subscription = mongoose.model('Subscription', subscriptionModel);

export default Subscription;