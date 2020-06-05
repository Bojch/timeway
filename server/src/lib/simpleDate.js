const SimpleDate = function () {
    const d = new Date();
    d.setHours(0, 0, 0, 0);

    const today = d.getDate();
    const tomorrow = today + 1;

    function get(day) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(day);
        return d.toISOString();
    }

    function now() {
        let d = new Date();
        return d.toISOString();
    }

    return {
        now: now(),
        today: {
            start: get(today),
            stop: get(tomorrow),
        },

        getStart: (date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.toISOString();
        },
        getStop: (date) => {
            const d = new Date(date);
            d.setHours(23, 59, 59, 999);
            return d.toISOString();
        },
    };
};

module.exports = SimpleDate;
