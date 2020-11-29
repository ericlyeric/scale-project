const transformUserData = (weights) => {
    const test = weights.map(elements => elements.date)
    const test2 = weights.map(elements => elements.weight);
    return {
        label: weights.map(elements => elements.date),
        datasets: [
            {
                label: 'Weight',
                data: weights.map(elements => elements.weight),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            }
        ]
    }
}

export default transformUserData;