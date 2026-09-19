// state.js — pure, immutable state updates (Lab 3) reused by the dashboard

export const deepClone = (value) => JSON.parse(JSON.stringify(value));

export const snapshot = (state) => deepClone(state);

export const changeCity = (state, city) => ({
    ...state,
    address: { ...state.address, city }
});

export const addSkill = (state, staffId, skill) => ({
    ...state,
    staff: state.staff.map(member => (
        member.id === staffId ? { ...member, skills: [...member.skills, skill] } : member
    ))
});

export const uniqueTags = (state) => [...new Set(state.tags)];
