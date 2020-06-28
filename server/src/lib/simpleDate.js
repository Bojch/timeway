const SimpleDate = function () {
    return {
        now: () => {
            let d = new Date();
            return d;
        },
        today: {
            start: () => {
                const d = new Date();
                d.setHours(0, 0, 0, 0);
                return d;
            },
            stop: () => {
                const d = new Date();
                d.setHours(23, 59, 59, 999);
                return d;
            },
        },

        getStart: (date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d;
        },
        getStop: (date) => {
            const d = new Date(date);
            d.setHours(23, 59, 59, 999);
            return d;
        },
    };
};

module.exports = SimpleDate;
