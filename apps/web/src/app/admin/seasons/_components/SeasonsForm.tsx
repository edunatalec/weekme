"use client";

import { createSeason, updateSeason } from "@/app/admin/seasons/actions";
import { useSeasonForm } from "@/app/admin/seasons/schema";
import { BaseForm } from "@/components/form/BaseForm";
import { InputFormField } from "@/components/form/InputFormField";
import { SelectFormField } from "@/components/form/SelectFormField";
import { SwitchFormField } from "@/components/form/SwitchFormField";
import { getSeasonName, SeasonEntity, SeasonName } from "@repo/core";

interface Props {
  season?: SeasonEntity;
}

export const SeasonsForm = ({ season }: Props) => {
  const form = useSeasonForm(season);

  return (
    <BaseForm
      {...form}
      id={season?.id}
      create={createSeason}
      update={updateSeason}
    >
      <h1 className="text-2xl">
        Preencha o formulário para {season ? "atualizar" : "cadastrar"} uma
        temporada
      </h1>

      <div className="flex flex-col gap-4 lg:flex-row">
        <SelectFormField
          className="lg:flex-1"
          control={form.control}
          name="name"
          label="Name"
          items={Object.keys(SeasonName).map((name) => ({
            key: name,
            value: getSeasonName(name as SeasonName),
          }))}
        />

        <InputFormField
          className="lg:flex-1"
          control={form.control}
          name="year"
          label="Ano"
          placeholder="2025..."
        />

        <SwitchFormField
          className="xl:flex-1"
          control={form.control}
          name="show"
          title="Exibir"
          description="Se o conteúdo irá ser exibido na página principal"
        />
      </div>
    </BaseForm>
  );
};
