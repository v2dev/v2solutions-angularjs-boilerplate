import {
  finalize,
  MonoTypeOperatorFunction,
  Observable,
  shareReplay,
} from 'rxjs';

export class RxJsUtils {
  private static readonly inProgress = new Map<string, Observable<unknown>>();

  static shareDuplicate<T>(identifier: string): MonoTypeOperatorFunction<T> {
    return (source$: Observable<T>): Observable<T> => {
      if (!this.inProgress.has(identifier)) {
        this.inProgress.set(identifier, source$.pipe(shareReplay(1)));
      }

      return (this.inProgress.get(identifier) as Observable<T>).pipe(
        finalize(() => this.inProgress.delete(identifier))
      );
    };
  }
}
