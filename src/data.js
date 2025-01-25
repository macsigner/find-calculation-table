export const data = {
    cashflowAnalysis: [
        {
            name: 'Cashflow-Marge',
            dependencies: [
                'Cashflow',
                'Umsatz'
            ],
            formula: 'Cashflow / Umsatz'
        },
        {
            name: 'Cashflow/Investitionsverhältnis',
            dependencies: [
                'Cashflow',
                'Nettoinvestitionen'
            ],
            formula: 'Cashflow / Nettoinvestitionen'
        },
        {
            name: 'Free Cashflow',
            dependencies: [
                'Cashflow',
                'Nettoinvestitionen'
            ],
            formula: 'Cashflow ./. Nettoinvestitionen'
        },
        {
            name: 'Verschuldungsfaktor',
            dependencies: [
                'Effektivverschuldung',
                'Cashflow'
            ],
            formula: 'Effektivverschuldung / Cashflow'
        },
        {
            name: 'Tilgungsfaktor',
            dependencies: [
                'Netto-Finanzschulden',
                'Cashflow'
            ],
            formula: 'Netto-Finanzschulden / Cashflow'
        },
        {
            name: 'Zinsdeckungsfaktor',
            dependencies: [
                'Cashflow + Zinsen',
                'Zinsen'
            ],
            formula: '(Cashflow + Zinsen) / Zinsen'
        },
        {
            name: 'Cash-burn-rate',
            dependencies: [
                'Flüssige Mittel',
                'Cashdrain'
            ],
            formula: 'Flüssige Mittel / Cashdrain'
        },
    ]
}
