const TIER_CONFIG = {
  bronze:   { minPoints: 0,     multiplier: 0.05 },
  silver:   { minPoints: 1000,  multiplier: 0.10 },
  gold:     { minPoints: 5000,  multiplier: 0.15 },
  platinum: { minPoints: 15000, multiplier: 0.20 },
};

export function hitungPoin(totalHarga, tier) {
  const numericTotal = Number(totalHarga) || 0;
  const multiplier = TIER_CONFIG[tier]?.multiplier ?? TIER_CONFIG.bronze.multiplier;
  return Math.floor(numericTotal * multiplier);
}

export function tentukanTier(lifetimePoints) {
  if (lifetimePoints >= 15000) return 'platinum';
  if (lifetimePoints >= 5000)  return 'gold';
  if (lifetimePoints >= 1000)  return 'silver';
  return 'bronze';
}

export function progressTierBerikutnya(lifetimePoints) {
  if (lifetimePoints >= 15000) return { progress: 100, sisaPoin: 0, tierBerikutnya: null };
  if (lifetimePoints >= 5000)  return {
    progress: Math.round(((lifetimePoints - 5000) / (15000 - 5000)) * 100),
    sisaPoin: 15000 - lifetimePoints,
    tierBerikutnya: 'platinum',
  };
  if (lifetimePoints >= 1000)  return {
    progress: Math.round(((lifetimePoints - 1000) / (5000 - 1000)) * 100),
    sisaPoin: 5000 - lifetimePoints,
    tierBerikutnya: 'gold',
  };
  return {
    progress: Math.round((lifetimePoints / 1000) * 100),
    sisaPoin: 1000 - lifetimePoints,
    tierBerikutnya: 'silver',
  };
}
