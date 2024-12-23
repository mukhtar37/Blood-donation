type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

const compatibilityChart: Record<BloodGroup, BloodGroup[]> = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'],
}

export function getCompatibleBloodGroups(bloodGroup: BloodGroup): BloodGroup[] {
  return compatibilityChart[bloodGroup] || []
}

export function areBloodGroupsCompatible(donorBloodGroup: BloodGroup, recipientBloodGroup: BloodGroup): boolean {
  const compatibleGroups = getCompatibleBloodGroups(recipientBloodGroup)
  return compatibleGroups.includes(donorBloodGroup)
}

