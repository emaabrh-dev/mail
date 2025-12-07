// components/SelectField.tsx
'use client';

import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from "@mui/material";
import { SelectTypeValue } from "@/lib/models/SelectTypeValue";
import { TextRepository } from "@/lib/repositories/TextRepository";
import { ClassificationRepository } from "@/lib/repositories/ClassificationRepository";
import { StatutRepository } from "@/lib/repositories/StatutRepository";
import { TextCategory } from "@/lib/models/TextCategory";

interface SelectFieldProps<T extends string | number | null> {
  value: T | null;
  onChange: (value: T | null) => void;
  fieldKey: string;
  label: string;
}

export function SelectField<T extends string | number | null>({
  value,
  onChange,
  fieldKey,
  label,
}: SelectFieldProps<T>) {
  const [options, setOptions] = useState<{ id: T; label: string; group?: string }[]>([]);

  useEffect(() => {
    const normalized = fieldKey.toLowerCase();

    if (normalized.includes("type_acte")) {
      const entries = TextRepository.getAll();

      const grouped: { [group: string]: { id: T; label: string }[] } = {};

      entries.forEach(([id, val]) => {
        let groups: string[] = [];

        Object.values(TextCategory)
          .filter(x => typeof x === "number")
          .forEach((cat) => {
            if (val.hasCategory(cat as number)) {
              const groupName = TextCategory[cat as number] || "other";
              const formatted = groupName.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase();
              groups.push(formatted);
            }
          });

        if (groups.length === 0) groups.push("other");

        groups.forEach((g) => {
          if (!grouped[g]) grouped[g] = [];
          grouped[g].push({
            id: id as any as T,
            label: `${val.abbreviation} - ${val.resourceKey}`
          });
        });
      });

      const final: { id: T; label: string; group?: string }[] = [];
      Object.entries(grouped).forEach(([group, items]) => {
        items.forEach((item) => final.push({ ...item, group }));
      });

      setOptions(final);
    }

    else if (normalized.includes("classification")) {
      const entries = ClassificationRepository.getAll();
      setOptions(entries.map(([id, v]) => ({ id: id as any as T, label: `${v.abbreviation} - ${v.resourceKey}` })));
    }

    else if (normalized.includes("statut")) {
      const entries = StatutRepository.getAll();
      setOptions(entries.map(([id, v]) => ({ id: id as any as T, label: `${v.abbreviation} - ${v.resourceKey}` })));
    }

  }, [label]);

  const renderMenuItems = () => {
    if (!options.some((o) => o.group)) {
      return options.map((opt) => (
        <MenuItem key={opt.id} value={opt.id}>
          {opt.label}
        </MenuItem>
      ));
    }

    const groups = options.reduce((acc, opt) => {
      const g = opt.group || "other";
      if (!acc[g]) acc[g] = [];
      acc[g].push(opt);
      return acc;
    }, {} as Record<string, typeof options>);

    return Object.entries(groups).flatMap(([group, items]) => [
      <ListSubheader key={`group-${group}`}>{group}</ListSubheader>,
      ...items.map((item) => (
        <MenuItem key={`${group}-${item.id}`} value={item.id}>
          {item.label}
        </MenuItem>
      )),
    ]);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value ?? ""}
        label={label}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? null : (v as T));
        }}
      >
        {/* ----- OPTION NULL ----- */}
        <MenuItem key="null-option" value="">
          <em>Aucun</em>
        </MenuItem>

        {renderMenuItems()}
      </Select>
    </FormControl>
  );
}