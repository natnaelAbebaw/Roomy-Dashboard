import styled from "styled-components";
import Container, { Length, Overflow, Position } from "../../ui/Container";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import Heading, { HeadingElement } from "../../ui/Heading";
import Input from "../../ui/Input";
import Flex, { FlexJustify } from "../../ui/Flex";
import DropDown from "../../ui/DropDown";
import { useState } from "react";
import MultiSelect from "../../ui/MultiSelect";
import Positioned from "../../ui/Positioned";
import Text, { FontWeight } from "../../ui/Text";
import FileUpload from "../../ui/FileUpload";
import Button, { ButtonType } from "../../ui/Button";
import { useForm } from "react-hook-form";
import { Cabin } from "../../services/cabinApi";
import {
  amenities,
  BedConfigurations,
  CabinTypes,
  ViewTypeEnum,
} from "../../ui/Filters/FilterConstants";
import { useCreateRoom } from "./useCreateRoom";
import { useUpdateRoom } from "./useUpdateRoom";
import { useAuth } from "../Authentication/AuthProvider";

const Label = styled.label`
  display: block;
  margin-bottom: ${Spacing.s4};
  color: var(--color-grey-500);
  font-size: ${Font.fs14};
`;

const StyledInput = styled(Input)`
  border: ${Spacing.s1} solid var(--color-grey-300);
  padding: ${Spacing.s8} ${Spacing.s12};
  border-radius: ${Spacing.s4};
`;

const InputBox = styled.div`
  width: 100%;
`;
const Textarea = styled.textarea`
  width: 100%;
  border: ${Spacing.s1} solid var(--color-grey-300);
  border-radius: 5px;
  height: 14rem;
  resize: none;
  padding: 2rem 3rem;
  background-color: var(--color-grey-0);
  &::placeholder {
    color: var(--color-grey-400);
    font-weight: ${FontWeight.Regular};
    font-family: inherit;
    font-size: 1.4rem;
    color: var(--color-grey-500);
  }
`;

const viewTypes = Object.values(ViewTypeEnum).map((item) => ({
  label: item,
  value: item,
}));

const roomTypes = Object.values(CabinTypes).map((item) => ({
  label: item,
  value: item,
}));

const bedConfigurations = Object.values(BedConfigurations).map((item) => ({
  label: item,
  value: item,
}));

const aminities = Object.values(amenities).map((item) => ({
  label: item,
  value: item,
}));

type Inputs = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  floor: number;
  beds: number;
  description: string;
};

const Error = styled.div`
  color: var(--color-red-700);
  margin-top: ${Spacing.s4};
  font-size: ${Font.fs12};
`;

function RoomForm({ close, room }: { close?: () => void; room?: Cabin }) {
  const isEditing = room ? true : false;

  const [selectedCabinType, setSelectedCabinType] = useState<{
    label: string;
    value: string | number;
  }>(room ? roomTypes.find((r) => r.value === room.cabinType)! : roomTypes[0]);
  const [selectedViewType, setSelectedViewType] = useState<{
    label: string;
    value: string | number;
  }>(room ? viewTypes.find((r) => r.value === room.viewType)! : viewTypes[0]);

  const [selectedBedConfigurations, setSelectedBedConfigurations] = useState<
    { label: string; value: string | number }[]
  >(
    room
      ? bedConfigurations.filter((a) =>
          room.bedConfigurations?.some((e) => e === a.value)
        )
      : []
  );

  const [selectedAminites, setSelectedAminites] = useState<
    { label: string; value: string | number }[]
  >(
    room
      ? aminities.filter((a) => room.amenities?.some((e) => e === a.value))
      : []
  );
  const { hotel: authHotel } = useAuth();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { register, handleSubmit, formState, reset, getValues } =
    useForm<Inputs>({
      defaultValues: {
        name: room?.name || "",
        maxCapacity: room?.maxCapacity || 1,
        regularPrice: room?.regularPrice || 1,
        discount: room?.discount || 0,
        floor: room?.floor || undefined,
        beds: room?.numBeds || undefined,
        description: room?.description || "",
      },
    });

  const { errors } = formState;

  const { createRoom, isCreateRoomLoading } = useCreateRoom();
  const { isUpdateRoomLoading, updateRoom } = useUpdateRoom();

  function onSubmit(data: Inputs) {
    const newCabin = new FormData();
    newCabin.append("name", data.name);
    newCabin.append("cabinType", selectedCabinType.value.toString());
    newCabin.append("viewType", selectedViewType.value.toString());
    newCabin.append("maxCapacity", data.maxCapacity.toString());
    newCabin.append("regularPrice", data.regularPrice.toString());
    newCabin.append("discount", data.discount.toString());
    newCabin.append("floor", data.floor.toString());
    newCabin.append("beds", data.beds.toString());
    newCabin.append("description", data.description);
    selectedAminites.forEach((item) => {
      newCabin.append("amenities", item.value.toString());
    });
    selectedBedConfigurations.forEach((item) => {
      newCabin.append("bedConfigurations", item.value.toString());
    });

    selectedImages.forEach((image) => {
      newCabin.append("albumImages", image);
    });

    if (isEditing && room) {
      if (!room._id) return;
      updateRoom(
        {
          hotelId: authHotel?.id as string,
          cabin: newCabin,
          cabinId: room._id,
        },
        {
          onSuccess: () => {
            close?.();
          },
        }
      );
    } else {
      createRoom(
        { hotelId: authHotel?.id as string, cabin: newCabin },
        {
          onSuccess: () => {
            close?.();
          },
        }
      );
    }
  }

  function handleSelectedCabinType(selected: {
    label: string;
    value: string | number;
  }) {
    setSelectedCabinType(selected);
  }

  const isLoading = isCreateRoomLoading || isUpdateRoomLoading;
  return (
    <Container
      padding={[Spacing.zero, Spacing.s96]}
      height={"80vh"}
      overflow={Overflow.Auto}
    >
      <Heading fs={Font.fs30} mb={Spacing.s4} as={HeadingElement.H2}>
        {isEditing ? "Edit" : "Create new"} room
      </Heading>
      <Heading
        fs={Font.fs14}
        fontWeight={FontWeight.Regular}
        mb={Spacing.s48}
        as={HeadingElement.H4}
      >
        Fill the room details below and {isEditing ? "Edit" : "Create new"}{" "}
        room.
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mb={Spacing.s16} width={Length.Full}>
          <InputBox>
            <Label htmlFor="name">Room Name</Label>
            <StyledInput
              placeholder="Sheraton..."
              type="text"
              id="name"
              disabled={isLoading}
              {...register("name", { required: "This field is required." })}
            />
            <Error>{errors.name?.message || <span>&nbsp;</span>}</Error>
          </InputBox>

          <InputBox>
            <Label htmlFor="type">Room Type</Label>

            <DropDown
              dropDownList={roomTypes}
              selected={selectedCabinType}
              onSelected={handleSelectedCabinType}
              options={{
                border: Spacing.s1,
                padding: [Spacing.s8, Spacing.s12],
                borderRadius: Spacing.s4,
                width: "100%",
                left: Spacing.zero,
                right: Spacing.Full,
              }}
            ></DropDown>
            <Error>&nbsp;</Error>
          </InputBox>
        </Flex>

        <Container mB={Spacing.s16}>
          <Flex mb={Spacing.s4}>
            <InputBox>
              <Label htmlFor="capacity">Capacity</Label>
              <StyledInput
                placeholder="1"
                type="number"
                id="capacity"
                {...register("maxCapacity", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                  min: {
                    value: 1,
                    message: "Minimum capacity is 1.",
                  },
                })}
                defaultValue={1}
                disabled={isLoading}
              />
              <Error>
                {errors.maxCapacity?.message || <span>&nbsp;</span>}
              </Error>
            </InputBox>
            <InputBox>
              <Label htmlFor="price">Price</Label>
              <Container position={Position.relative}>
                <Positioned
                  top={Spacing["s1/2"]}
                  left={Spacing.s16}
                  transform={[Length["L-1/2"], Length["L-1/2"]]}
                >
                  <Text color={Color.grey500}>$</Text>
                </Positioned>
                <Input
                  border={Spacing.s1}
                  padding={[Spacing.s8, Spacing.s8, Spacing.s8, Spacing.s32]}
                  placeholder="0.00"
                  type="number"
                  id="price"
                  borderRadius={Spacing.s4}
                  disabled={isLoading}
                  {...register("regularPrice", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                    min: {
                      value: 1,
                      message: "Minimum price is 1.",
                    },
                  })}
                />
                <Positioned
                  top={Spacing["s1/2"]}
                  right={Spacing.s16}
                  transform={[Length["L-1/2"], Length["L-1/2"]]}
                >
                  <Text color={Color.grey500}>USD</Text>
                </Positioned>
              </Container>
              <Error>
                {errors.regularPrice?.message || <span>&nbsp;</span>}
              </Error>
            </InputBox>
            <InputBox>
              <Label htmlFor="discount">Discount</Label>
              <Container position={Position.relative}>
                <Positioned
                  top={Spacing["s1/2"]}
                  left={Spacing.s16}
                  transform={[Length["L-1/2"], Length["L-1/2"]]}
                >
                  <Text color={Color.grey500}>$</Text>
                </Positioned>
                <Input
                  border={Spacing.s1}
                  padding={[Spacing.s8, Spacing.s8, Spacing.s8, Spacing.s32]}
                  placeholder="0.00"
                  type="number"
                  id="discount"
                  disabled={isLoading}
                  borderRadius={Spacing.s4}
                  defaultValue={0}
                  {...register("discount", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                    min: {
                      value: 0,
                      message: "Minimum discount is 0.",
                    },
                    validate: (value) => {
                      return (
                        Number(value) <= Number(getValues("regularPrice")) ||
                        "Discount should be less than price."
                      );
                    },
                  })}
                />
                <Positioned
                  top={Spacing["s1/2"]}
                  right={Spacing.s16}
                  transform={[Length["L-1/2"], Length["L-1/2"]]}
                >
                  <Text color={Color.grey500}>USD</Text>
                </Positioned>
              </Container>
              <Error>{errors.discount?.message || <span>&nbsp;</span>}</Error>
            </InputBox>
          </Flex>
          <Flex>
            <InputBox>
              <Label htmlFor="Floor">Floor</Label>
              <StyledInput
                placeholder="1"
                type="number"
                id="Floor"
                disabled={isLoading}
                {...register("floor", { required: "This field is required." })}
              />
              <Error>{errors.floor?.message}</Error>
            </InputBox>
            <InputBox>
              <Label htmlFor="Beds">Beds </Label>
              <StyledInput
                placeholder="1"
                type="number"
                id="Beds"
                disabled={isLoading}
                defaultValue={1}
                {...register("beds", {
                  required: "This field is required.",
                  min: {
                    value: 1,
                    message: "Minimum bed is 1.",
                  },
                })}
              />
              <Error>{errors.beds?.message || <span>&nbsp;</span>}</Error>
            </InputBox>
            <InputBox>
              <Label htmlFor="viewType">View Type</Label>
              <DropDown
                dropDownList={viewTypes}
                selected={selectedViewType}
                onSelected={(selected) => setSelectedViewType(selected)}
                options={{
                  border: Spacing.s1,
                  padding: [Spacing.s8, Spacing.s12],
                  borderRadius: Spacing.s4,
                }}
              ></DropDown>
              <Error>&nbsp;</Error>
            </InputBox>
          </Flex>
        </Container>

        <Container mB={Spacing.s32}>
          <div>
            <Label htmlFor="Aminites">Aminites</Label>
            <MultiSelect
              selectedItems={selectedAminites}
              setSelectedItems={setSelectedAminites}
              dropDownList={aminities}
              placeholder="Select Aminites"
            />
            <Error>&nbsp;</Error>
          </div>
          <div>
            <Label htmlFor="bedConfigurations">Bed Configurations</Label>
            <MultiSelect
              selectedItems={selectedBedConfigurations}
              setSelectedItems={setSelectedBedConfigurations}
              dropDownList={bedConfigurations}
              placeholder="Select Bed Configurations"
            />
            <Error>&nbsp;</Error>
          </div>

          <div>
            <Label htmlFor="AlbumImages">Album Images</Label>
            <FileUpload
              selectedImageFiles={selectedImages}
              setSelectedImageFiles={setSelectedImages}
            />
            <Error>&nbsp;</Error>
          </div>

          <div>
            <Label htmlFor="AlbumImages">Description</Label>
            <Textarea
              placeholder="Write some description..."
              {...register("description")}
            ></Textarea>
            <Error>&nbsp;</Error>
          </div>
        </Container>

        <Flex justify={FlexJustify.End}>
          <Button
            buttonType={ButtonType.Outline}
            padding={[Spacing.s12, Spacing.s24]}
            onClick={(e) => {
              e.preventDefault();
              reset();
              setSelectedCabinType(roomTypes[0]);
              setSelectedViewType(viewTypes[0]);
              setSelectedBedConfigurations([]);
              setSelectedAminites([]);
              setSelectedImages([]);
            }}
          >
            Cancel
          </Button>

          <Button
            padding={[Spacing.s12, Spacing.s24]}
            color={Color.grey0}
            type="submit"
          >
            {isEditing ? "Edit" : "Create"} Room
          </Button>
        </Flex>
      </form>
    </Container>
  );
}

export default RoomForm;
