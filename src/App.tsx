import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createFilterOptions,
  createTheme,
} from '@mui/material';
import type { User, UserOption } from './types/user';

const filterUserOptions = createFilterOptions<UserOption>({
  trim: true,
  stringify: (option) =>
    `${option.displayName} ${option.name} ${option.parsedName.firstName} ${option.parsedName.lastName}`,
});
import { parseAndFormatUserName } from './utils/formatUserName';

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await fetch(USERS_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Unable to fetch users.');
        }

        const data = (await response.json()) as User[];

        setUsers(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Something went wrong while fetching users.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, []);

  const userOptions = useMemo<UserOption[]>(() => {
    return users
      .map((user) => {
        const parsedName = parseAndFormatUserName(user.name);

        return {
          ...user,
          parsedName,
          displayName: parsedName.formattedName,
        };
      })
      .sort((firstUser, secondUser) => {
        const lastNameComparison = firstUser.parsedName.sortKey.localeCompare(secondUser.parsedName.sortKey);

        if (lastNameComparison !== 0) {
          return lastNameComparison;
        }

        return firstUser.parsedName.firstName.localeCompare(secondUser.parsedName.firstName);
      });
  }, [users]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="sm" className="page-container">
        <Stack spacing={3} sx={{ width: '100%' }}>
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

          <Autocomplete
            options={userOptions}
            value={selectedUser}
            loading={isLoading}
            loadingText="Loading users..."
            onChange={(_, newValue) => {
              setSelectedUser(newValue);
            }}
            getOptionLabel={(option) => option.displayName}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterOptions={filterUserOptions}
            noOptionsText="No users found"
            renderInput={(params) => {
              const inputSlotProps = params.slotProps?.input ?? {};

              return (
                <TextField
                  {...params}
                  label="Name"
                  slotProps={{
                    ...params.slotProps,
                    input: {
                      ...inputSlotProps,
                      endAdornment: (
                        <>
                          {isLoading ? <CircularProgress color="inherit" size={20} /> : null}

                          {inputSlotProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              );
            }}
          />

          {selectedUser ? (
            <Box>
              <Typography variant="body1">{selectedUser.displayName}</Typography>
              <Typography variant="body1">{selectedUser.address.street}</Typography>
              <Typography variant="body1">{selectedUser.address.suite}</Typography>
              <Typography variant="body1">{selectedUser.address.city}</Typography>
              <Typography variant="body1">{selectedUser.address.zipcode}</Typography>
            </Box>
          ) : null}
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
