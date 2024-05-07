'use client';

import type { FormData } from '@/types/app/page.types';
import { ANIMATION_SPEED, ARRAY_LENGTHS, SORT_TYPES } from '@/utils/enums';

export function updateFormData(value: FormData) {
    if (window) {
        sessionStorage.setItem('formData', JSON.stringify(value));
    }
}

export function getSavedFormData(): FormData {
    try {
        const storedData = sessionStorage.getItem('formData') || '{}';
        const formData = JSON.parse(storedData);
        if (formData.size && !Object.values(ARRAY_LENGTHS).includes(formData.size)) {
            return {};
        }
        if (formData.speed && !Object.values(ANIMATION_SPEED).includes(formData.speed)) {
            return {};
        }
        if (formData.sort && !Object.values(SORT_TYPES).includes(formData.sort)) {
            return {};
        }
        return formData;
    } catch {
        return {};
    }
}
