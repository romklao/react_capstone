const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const FavoriteSchema = mongoose.Schema({
    product: {
        type: Object, 
        required: true
    }
});

FavoriteSchema.methods.apiRepr = function() {
    return {
        id: this._id || '',
        product: this.product || '',
    };
}

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    },
    favorites: [ FavoriteSchema ]
});

UserSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        favorites: this.favorites,
    };
}

UserSchema.methods.validatePassword = function(password) {
    return bcrypt
        .compare(password, this.password)
        .then(isValid => isValid);
}

UserSchema.statics.hashPassword = function(password) {
    return bcrypt
        .hash(password, 10)
        .then(hash => hash);
}

const Favorite = mongoose.model('Favorite', FavoriteSchema); 

const User = mongoose.model('User', UserSchema);

module.exports = {User, Favorite};




















