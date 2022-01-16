const getCost = (weight) => {
    const g = Number(weight) * 1000
    if (g <= 20) return 32
    else if (g <= 100) return 37
    else if (g <= 250) return 42
    else if (g <= 500) return 52
    else if (g <= 1000) return 67
    else if (g <= 1500) return 82
    else if (g <= 2000) return 97
    else if (g <= 2500) return 122
    else if (g <= 3000) return 132
    else if (g <= 3500) return 142
    else if (g <= 4000) return 152
    else if (g <= 4500) return 162
    else if (g <= 5000) return 172
    else if (g <= 5500) return 192
    else if (g <= 6000) return 212
    else if (g <= 6500) return 232
    else if (g <= 7000) return 252
    else if (g <= 7500) return 272
    else if (g <= 8000) return 292
    else if (g <= 8500) return 312
    else if (g <= 9000) return 332
    else if (g <= 9500) return 352
    else if (g <= 10000) return 372
    else if (g <= 11000) return 452
    else if (g <= 12000) return 492
    else if (g <= 13000) return 507
    else if (g <= 14000) return 522
    else if (g <= 15000) return 537
    else if (g <= 16000) return 552
    else if (g <= 17000) return 567
    else if (g <= 18000) return 582
    else if (g <= 19000) return 597
    else if (g <= 20000) return 612
}

module.exports = {
    getCost
}