export const data = [
    {
        title: 'Cashflow-Analyse',
        items: [
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
    },
    {
        title: 'Aktivität',
        items: [
            {
                name: 'Umschlag Forderungen L+L',
                dependencies: [
                    '(Kredit-)Warenertrag',
                    'Ø Forderungen L+L'
                ],
                formula: '(Kredit-)Warenertrag / Ø Forderungen L+L'
            },
            {
                name: 'Zahlungsfrist Kunden',
                dependencies: [
                    '365 (evtl. 360)',
                    'Umschlag Forderungen L+L'
                ],
                formula: '365 (evtl. 360) / Umschlag Forderungen L+L'
            },
            {
                name: 'Lagerumschlag',
                dependencies: [
                    'Warenaufwand',
                    'Ø Warenvorrat'
                ],
                formula: 'Warenaufwand / Ø Warenvorrat'
            },
            {
                name: 'Umschlag Verbindlichkeiten L+L',
                dependencies: [
                    '(Kredit-)Wareneinkäufe',
                    'Ø Verbindlichkeiten L+L'
                ],
                formula: '(Kredit-)Wareneinkäufe / Ø Verbindlichkeiten L+L'
            },
            {
                name: 'Zahlungsfrist Lieferanten',
                dependencies: [
                    '365 (evtl. 360)',
                    'Umschlag Verbindl. L+L'
                ],
                formula: '365 (evtl. 360) / Umschlag Verbindl. L+L'
            },
            {
                name: 'Kapitalumschlag',
                dependencies: [
                    'Umsatz',
                    'Gesamtkapital'
                ],
                formula: 'Umsatz / Gesamtkapital'
            },
            {
                name: 'Umschlag des operativen Nettoumlaufvermögens',
                dependencies: [
                    'Umsatz',
                    'Operatives NUV'
                ],
                formula: 'Umsatz / Operatives NUV'
            },
        ]
    }
]
