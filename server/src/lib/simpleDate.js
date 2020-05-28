const SimpleDate = function () {
    const d = new Date();
    d.setHours(0, 0, 0, 0);

    const today = d.getDate();
    const tomorrow = today + 1;
    const yesterday = today - 1;

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
        yesterday: {
            start: get(yesterday),
            stop: get(today),
        },
    };
};

module.exports = SimpleDate;
