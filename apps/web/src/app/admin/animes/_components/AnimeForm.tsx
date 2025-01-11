"use client";

import { createAnime, updateAnime } from "@/app/admin/animes/actions";
import { useAnimeForm } from "@/app/admin/animes/schema";
import { BaseForm } from "@/components/form/BaseForm";
import { DatePickerFormField } from "@/components/form/DatePickerFormField";
import { InputFormField } from "@/components/form/InputFormField";
import { SelectFormField } from "@/components/form/SelectFormField";
import { TextAreaFormField } from "@/components/form/TextAreaFormField";
import { urlValidator } from "@/validators/url.validator";
import { AnimeEntity, AnimeStatus, getStatusName, WEEKDAYS } from "@repo/core";
import Image from "next/image";

interface Props {
  anime?: AnimeEntity;
}

export const AnimeForm = ({ anime }: Props) => {
  const form = useAnimeForm(anime);

  const imageUrl = form.watch("imageUrl");
  const backgroundUrl = form.watch("backgroundUrl");

  return (
    <BaseForm
      {...form}
      id={anime?.id}
      create={createAnime}
      update={updateAnime}
    >
      <h1 className="text-2xl">
        Preencha o formulário para {anime ? "atualizar" : "cadastrar"} um anime
      </h1>

      <InputFormField
        control={form.control}
        name="name"
        label="Nome"
        placeholder="One piece..."
      />

      <div className="flex flex-col">
        <InputFormField
          control={form.control}
          name="backgroundUrl"
          label="Capa"
          placeholder="https://www..."
          description="URL com uma imagem de 1200x500"
        />

        {urlValidator.safeParse(backgroundUrl).success && (
          <Image
            src={backgroundUrl!}
            layout="responsive"
            width={0}
            height={0}
            alt="Capa do anime"
            className="mt-4 max-w-full rounded-md"
          />
        )}
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col">
          <InputFormField
            className="flex-1"
            control={form.control}
            name="imageUrl"
            label="Foto"
            placeholder="https://www..."
            description="URL com uma imagem de 300x300"
          />

          {urlValidator.safeParse(imageUrl).success && (
            <Image
              src={imageUrl}
              layout="responsive"
              width={0}
              height={0}
              alt="Foto do anime"
              className="mt-4 max-w-[100%] rounded-md md:max-w-[50%]"
            />
          )}
        </div>

        <SelectFormField
          className="flex-1"
          control={form.control}
          name="status"
          label="Status"
          items={Object.keys(AnimeStatus).map((status) => ({
            key: status,
            value: getStatusName(status as AnimeStatus),
          }))}
        />
      </div>

      <TextAreaFormField
        control={form.control}
        name="synopsis"
        label="Sinopsis"
      />

      <div className="flex flex-col gap-2 lg:flex-row">
        <SelectFormField
          className="flex-1"
          control={form.control}
          name="weekday"
          label="Dia da semana"
          items={WEEKDAYS.map((weekday: string, i: number) => ({
            key: i.toString(),
            value: weekday,
          }))}
        />

        <DatePickerFormField
          className="flex-1"
          control={form.control}
          name="startDate"
          label="Data início"
        />

        <DatePickerFormField
          className="flex-1"
          control={form.control}
          name="finishDate"
          label="Data fim"
        />
      </div>
    </BaseForm>
  );
};
