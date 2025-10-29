export const commonCards = [
    {
        text: "Senhor, o general pede um aumento para seus soldados.",
        rightButtonText: "Permissão concedida",
        leftButtonText: "Não, mantenha como está",
        effects: {
            rightButtonEffects: { commonEffects: { army: +10, economy: -10 } },
            leftButtonEffects: { commonEffects: { army: -10, economy: +10 } },
        },
    },
]